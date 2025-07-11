'use client';
import { useEffect, useRef, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPlay,
  FaStop,
  FaSync,
  FaTachometerAlt,
} from 'react-icons/fa';

export default function SpeedPage() {
  // 速度检测相关状态
  const [isTracking, setIsTracking] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [status, setStatus] = useState<{ type: 'info' | 'error' | 'active' | 'success'; msg: string }>({
    type: 'info',
    msg: '点击"开始"按钮启动速度监控',
  });
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  // 内部变量
  const watchId = useRef<number | null>(null);
  const lastPosition = useRef<{ lat: number; lng: number; timestamp: number } | null>(null);
  const timer = useRef<number | null>(null);
  const speedSum = useRef(0);
  const speedCount = useRef(0);

  // 计时器
  useEffect(() => {
    if (isTracking) {
      timer.current = window.setInterval(() => setDuration(d => d + 1), 1000);
    } else if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isTracking]);

  // 开始检测
  const startTracking = () => {
    if (!navigator.geolocation) {
      setStatus({ type: 'error', msg: '您的浏览器不支持地理位置服务' });
      return;
    }
    setStatus({ type: 'info', msg: '正在获取位置信息...' });
    resetData();
    setIsTracking(true);
    watchId.current = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 },
    );
  };

  // 停止检测
  const stopTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setIsTracking(false);
    setStatus({ type: 'success', msg: '已停止速度检测' });
  };

  // 处理位置更新
  function handlePosition(pos: GeolocationPosition) {
    setStatus({ type: 'active', msg: '正在实时检测速度' });
    setAccuracy(pos.coords.accuracy ?? null);
    setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    // 计算距离、速度
    if (lastPosition.current) {
      const dist = calculateDistance(
        lastPosition.current.lat,
        lastPosition.current.lng,
        pos.coords.latitude,
        pos.coords.longitude,
      );
      setDistance(d => d + dist / 1000); // km
      const timeDiff = (pos.timestamp - lastPosition.current.timestamp) / 1000 / 3600; // 小时
      let currentSpeed = dist / 1000 / timeDiff;
      if (pos.coords.speed !== null) {
        currentSpeed = pos.coords.speed * 3.6;
      }
      setSpeed(Number.isFinite(currentSpeed) ? currentSpeed : 0);
      setMaxSpeed(s => (currentSpeed > s ? currentSpeed : s));
      speedSum.current += currentSpeed;
      speedCount.current += 1;
      setAvgSpeed(speedSum.current / speedCount.current);
    }
    lastPosition.current = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      timestamp: pos.timestamp,
    };
  }

  // 处理错误
  function handleError(error: GeolocationPositionError) {
    let msg = '发生未知错误';
    if (error.code === error.PERMISSION_DENIED) {
      msg = '用户拒绝了位置请求';
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      msg = '位置信息不可用';
    } else if (error.code === error.TIMEOUT) {
      msg = '获取位置超时';
    }
    setStatus({ type: 'error', msg: `错误: ${msg}` });
    stopTracking();
  }

  // 重置数据
  function resetData() {
    setSpeed(0);
    setAccuracy(null);
    setDistance(0);
    setDuration(0);
    setMaxSpeed(0);
    setAvgSpeed(0);
    speedSum.current = 0;
    speedCount.current = 0;
    lastPosition.current = null;
    setPosition(null);
  }

  // 计算两点间距离（Haversine公式）
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a
      = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
        + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 精度仪表宽度
  const accuracyPercent = accuracy ? Math.min(100, Math.max(0, 100 - (accuracy / 50) * 100)) : 0;

  // 持续时间格式化
  const durationStr = `${String(Math.floor(duration / 60)).padStart(2, '0')}:${String(duration % 60).padStart(2, '0')}`;

  // 状态栏颜色
  const statusColor
    = status.type === 'error'
      ? 'bg-red-900 text-red-300 border-red-700'
      : status.type === 'active'
        ? 'bg-blue-900 text-blue-300 border-blue-700'
        : status.type === 'success'
          ? 'bg-green-900 text-green-300 border-green-700'
          : 'bg-neutral-900 text-white border-neutral-700';

  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-4 transition-colors duration-200">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {/* 标题 */}
        <header className="text-center p-4 border rounded mb-2">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FaTachometerAlt />
            {' '}
            时速检测
          </h2>
          <p className="subtitle text-neutral-400 mt-1">利用浏览器定位功能实时检测您的运动速度 - 适用于跑步、骑行、驾车等场景</p>
        </header>
        {/* 主体仪表盘 */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 速度显示卡片 */}
          <div className="card border rounded p-6 flex flex-col items-center bg-opacity-80">
            <h2 className="text-lg font-semibold mb-2">当前速度</h2>
            <div className="flex items-end mb-2">
              <span className="speed-value text-5xl font-bold">{speed.toFixed(1)}</span>
              <span className="unit text-xl ml-2">km/h</span>
            </div>
            <div className="accuracy w-full mt-2">
              <div>
                定位精度:
                <span>{accuracy !== null ? accuracy.toFixed(1) : '--'}</span>
                {' '}
                米
              </div>
              <div className="gauge w-full h-2 bg-neutral-700 rounded mt-1 overflow-hidden">
                <div
                  className="gauge-fill h-2 rounded bg-blue-500 transition-all"
                  style={{ width: `${accuracyPercent}%` }}
                >
                </div>
              </div>
            </div>
          </div>
          {/* 控制面板卡片 */}
          <div className="card border rounded p-6 flex flex-col gap-3 bg-opacity-80">
            <button
              className="flex items-center justify-center gap-2 border rounded px-4 py-2 text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800"
              onClick={startTracking}
              disabled={isTracking}
              type="button"
            >
              <FaPlay />
              {' '}
              开始
            </button>
            <button
              className="flex items-center justify-center gap-2 border rounded px-4 py-2 text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800"
              onClick={stopTracking}
              disabled={!isTracking}
              type="button"
            >
              <FaStop />
              {' '}
              停止
            </button>
            {/* 统计数据 */}
            <div className="stats grid grid-cols-2 gap-2 mt-2">
              <div className="stat-card border rounded p-2 text-center">
                <div className="stat-label text-xs text-neutral-400">行驶距离</div>
                <div className="stat-value text-lg font-bold">{distance.toFixed(2)}</div>
                <div className="stat-label text-xs">公里</div>
              </div>
              <div className="stat-card border rounded p-2 text-center">
                <div className="stat-label text-xs text-neutral-400">持续时间</div>
                <div className="stat-value text-lg font-bold">{durationStr}</div>
              </div>
              <div className="stat-card border rounded p-2 text-center">
                <div className="stat-label text-xs text-neutral-400">最高速度</div>
                <div className="stat-value text-lg font-bold">{maxSpeed.toFixed(1)}</div>
                <div className="stat-label text-xs">km/h</div>
              </div>
              <div className="stat-card border rounded p-2 text-center">
                <div className="stat-label text-xs text-neutral-400">平均速度</div>
                <div className="stat-value text-lg font-bold">{avgSpeed.toFixed(1)}</div>
                <div className="stat-label text-xs">km/h</div>
              </div>
            </div>
            {/* 状态栏 */}
            <div className={`status border rounded p-2 mt-2 flex items-center gap-2 ${statusColor}`}>
              {status.type === 'error' && <FaExclamationTriangle className="text-lg" />}
              {status.type === 'active' && <FaSync className="text-lg animate-spin" />}
              {status.type === 'success' && <FaCheckCircle className="text-lg" />}
              {status.type === 'info' && <FaInfoCircle className="text-lg" />}
              <span>{status.msg}</span>
            </div>
            {/* 警告 */}
            <div className="warning flex items-center gap-2 text-yellow-400 bg-neutral-900 border border-yellow-700 rounded p-2 mt-2 text-sm">
              <FaExclamationTriangle />
              注意：在移动设备上使用GPS定位更准确，桌面设备可能精度较低
            </div>
          </div>
        </main>
        {/* 运动轨迹卡片 */}
        <div className="card border rounded p-6 mt-2">
          <h2 className="text-lg font-semibold mb-2">运动轨迹</h2>
          <div className="map-container h-48 flex flex-col items-center justify-center bg-neutral-900 rounded">
            <div className="map-overlay flex flex-col items-center justify-center">
              <FaMapMarkerAlt className="text-3xl mb-2" />
              <span>位置跟踪地图</span>
            </div>
            <div className="text-center mt-2 text-sm">
              {position
                ? (
                    <>
                      <span>
                        当前位置:
                        {position.lat.toFixed(6)}
                        ,
                        {position.lng.toFixed(6)}
                      </span>
                      <div className="text-xs text-neutral-500 mt-1">地图功能需要集成地图服务API</div>
                    </>
                  )
                : (
                    <span className="text-neutral-500">暂无定位数据</span>
                  )}
            </div>
          </div>
        </div>
        {/* 页脚 */}
        <footer className="text-center text-xs text-neutral-400 mt-4">
          运动时速检测系统 &copy; 2023 | 使用HTML5 Geolocation API实现
        </footer>
      </div>
    </div>
  );
}
