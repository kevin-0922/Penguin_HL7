import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function RequestLogs() {
  const { lang } = useLanguage();
  const zh = lang === 'zh';
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [protocol, setProtocol] = useState('');
  const [automatic, setAutomatic] = useState(true);
  const [error, setError] = useState('');
  const [updated, setUpdated] = useState('');
  const [started, setStarted] = useState('');

  useEffect(() => {
    let active = true;
    let timer;
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch('/api/request-logs', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error(String(response.status));
        const result = await response.json();
        if (active) {
          setLogs(result.data);
          setStarted(result.startedAt);
          setUpdated(new Date().toLocaleTimeString());
          setError('');
        }
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active && automatic) timer = setTimeout(refresh, 3000);
      }
    }
    refresh();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [automatic]);

  const filtered = logs.filter(row => (!protocol || row.protocol === protocol) &&
    [row.ip, row.method, row.path, row.status].some(value => String(value).toLowerCase().includes(search.toLowerCase())));
  const headers = zh ? ['時間', '協定', '來源 IP', '方法', '路徑／埠', '狀態', '耗時'] :
    ['Time', 'Protocol', 'Source IP', 'Method', 'Path / port', 'Status', 'Duration'];

  return <section>
    <h1 className="text-2xl font-bold mb-3">{zh ? '請求紀錄' : 'Request logs'}</h1>
    <p className="text-sm text-gray-600 mb-4">{zh ?
      '保留最近 1,000 筆 HTTP 與 MLLP 紀錄，服務重啟後清空。來源 IP 是連線設備；經過代理時可能顯示代理 IP。不記錄請求內容、查詢參數及標頭。' :
      'Latest 1,000 HTTP and MLLP events; cleared on restart. IP identifies the connecting device and may be a proxy. Bodies, query parameters and headers are omitted.'}</p>
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <input aria-label={zh ? '搜尋紀錄' : 'Search logs'} placeholder={zh ? '搜尋 IP、路徑、狀態…' : 'Search IP, path, status…'} value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2" />
      <select aria-label={zh ? '協定' : 'Protocol'} value={protocol} onChange={e => setProtocol(e.target.value)} className="border rounded px-3 py-2">
        <option value="">{zh ? '全部協定' : 'All protocols'}</option><option>HTTP</option><option>MLLP</option>
      </select>
      <label><input type="checkbox" checked={automatic} onChange={e => setAutomatic(e.target.checked)} /> {zh ? '每 3 秒更新' : 'Refresh every 3 seconds'}</label>
      <span className="text-sm text-gray-500">{zh ? '最近更新：' : 'Updated: '}{updated || '—'}</span>
    </div>
    {error && <p role="alert" className="text-red-600 mb-3">{zh ? '讀取失敗，顯示的可能是舊紀錄：' : 'Fetch failed; displayed logs may be stale: '}{error}</p>}
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left"><thead className="bg-gray-100"><tr>{headers.map(h => <th key={h} className="p-3 whitespace-nowrap">{h}</th>)}</tr></thead>
        <tbody>{filtered.map(row => <tr key={row.id} className="border-t">
          <td className="p-3 whitespace-nowrap">{new Date(row.time).toLocaleString()}</td><td className="p-3">{row.protocol}</td>
          <td className="p-3 font-mono whitespace-nowrap">{row.ip}</td><td className="p-3">{row.method}</td>
          <td className="p-3 break-all">{row.path}</td><td className="p-3">{row.status}</td>
          <td className="p-3 whitespace-nowrap">{row.durationMs == null ? '—' : `${row.durationMs} ms`}</td>
        </tr>)}{!filtered.length && <tr><td colSpan={7} className="p-6 text-center text-gray-500">{zh ? '尚無符合的紀錄' : 'No matching logs'}</td></tr>}</tbody>
      </table>
    </div>
    <p className="text-xs text-gray-500 mt-3">{zh ? '目前顯示' : 'Showing'} {filtered.length} / {logs.length} · {zh ? '服務啟動時間：' : 'Service started: '}{started ? new Date(started).toLocaleString() : '—'}</p>
  </section>;
}
