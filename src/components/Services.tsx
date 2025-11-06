import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../hooks/useServices';
import * as Icons from 'lucide-react';

interface ServicesProps {
  config?: {
    background_color?: string;
    text_color?: string;
  };
}

export const Services: React.FC<ServicesProps> = ({ config }) => {
  const { language, t } = useLanguage();
  const { data: services, loading } = useServices();

  if (loading) {
    return (
      <section id="service" className="py-20" style={config?.background_color ? { backgroundColor: config.background_color } : {}}>
        <div className="container mx-auto px-4" style={config?.text_color ? { color: config.text_color } : {}}>
          <div className="text-center">
            <p className={!config?.text_color ? 'text-gray-500' : ''}>{t('読み込み中...', '加载中...')}</p>
          </div>
        </div>
      </section>
    );
  }

  const sectionStyle: React.CSSProperties = {};
  if (config?.background_color) {
    sectionStyle.backgroundColor = config.background_color;
  }

  return (
    <section id="service" className={`py-20 ${!config?.background_color ? 'bg-gray-50' : ''}`} style={sectionStyle}>
      <div className="container mx-auto px-4" style={config?.text_color ? { color: config.text_color } : {}}>
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2 sm:gap-3 ${!config?.text_color ? 'text-gray-900' : ''}`}>
            <span className="text-2xl sm:text-3xl md:text-4xl">🔧</span>
            <span>{t('サービス内容', '服务内容')}</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            {t(
              '太陽光発電システムの長期安定稼働を支える、充実したサービスラインナップ',
              '支持太阳能发电系统长期稳定运行的完善服务阵容'
            )}
          </p>
        </div>

        {/* サービスカード */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon && (Icons as any)[service.icon] 
              ? (Icons as any)[service.icon] 
              : Icons.Star;

            const colors = [
              'from-indigo-500 to-blue-500',
              'from-purple-500 to-pink-500',
              'from-cyan-500 to-teal-500',
              'from-violet-500 to-fuchsia-500',
            ];
            const bgColors = [
              'from-indigo-50 to-blue-50',
              'from-purple-50 to-pink-50',
              'from-cyan-50 to-teal-50',
              'from-violet-50 to-fuchsia-50',
            ];

            return (
              <div
                key={service.id}
                className={`bg-gradient-to-br ${bgColors[index % 4]} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
              >
                {/* アイコン */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${colors[index % 4]} rounded-xl mb-4 shadow-md`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* サービス名 */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'zh' ? service.service_name_zh : service.service_name_ja}
                </h3>

                {/* 説明 */}
                <div className="text-gray-700 space-y-2">
                  {(language === 'zh' ? service.description_zh : service.description_ja)
                    ?.split('\n')
                    .map((line, i) => (
                      <p key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="flex-1">{line}</span>
                      </p>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
