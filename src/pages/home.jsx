import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "../contexts/LanguageContext";

const Home = () => {
  const [mllpConfig, setMllpConfig] = useState({
    remoteHost: "",
    remotePort: "",
    timeout: "30000"
  });
  const [saveStatus, setSaveStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [needInit, setNeedInit] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await axios.get("api/mllp/config");
        if (response.data.success && response.data.data) {
          if (!response.data.data.remoteHost || response.data.data.remoteHost.trim() === '') {
            setNeedInit(true);
          } else {
            setNeedInit(false);
          }
          setMllpConfig(response.data.data);
        }
      } catch (error) {
        console.error("獲取配置失敗:", error);
        setNeedInit(true);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMllpConfig({ ...mllpConfig, [name]: value });
    if (name === 'remoteHost' && value.trim() !== '') {
      setNeedInit(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/mllp/config", mllpConfig);
      setSaveStatus(t('home.saved'));
      setNeedInit(false);
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("保存設定失敗:", error);
      setSaveStatus(t('home.saveFailed'));
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">{t('home.title')}</h1>

      <div className="border p-4 rounded-lg shadow-md mb-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-3">{t('home.mllpConfig')}</h2>
        {loading ? (
          <p className="text-center py-4">{t('common.loading')}</p>
        ) : (
          <>
            {needInit && (
              <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                {t('home.needInit')}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  {t('home.remoteHost')}
                </label>
                <input
                  type="text"
                  name="remoteHost"
                  value={mllpConfig.remoteHost}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${needInit ? 'border-yellow-400' : ''}`}
                  placeholder={t('home.hostPlaceholder')}
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  {t('home.remotePort')}
                </label>
                <input
                  type="text"
                  name="remotePort"
                  value={mllpConfig.remotePort}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder={t('home.portPlaceholder')}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {t('home.timeout')}
                </label>
                <input
                  type="text"
                  name="timeout"
                  value={mllpConfig.timeout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder={t('home.timeoutPlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                {t('home.save')}
              </button>

              {saveStatus && (
                <p className="mt-2 text-center text-sm font-medium text-green-600">
                  {saveStatus}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
