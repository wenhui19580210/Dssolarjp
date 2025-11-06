import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFAQs } from '../hooks/useFAQs';

interface FAQProps {
  config?: {
    background_color?: string;
    text_color?: string;
  };
}

export const FAQ: React.FC<FAQProps> = ({ config }) => {
  const { language, t } = useLanguage();
  const { data: faqs, loading } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section className="py-20" style={config?.background_color ? { backgroundColor: config.background_color } : {}}>
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
    <section className={`py-20 ${!config?.background_color ? 'bg-gray-50' : ''}`} style={sectionStyle}>
      <div className="container mx-auto px-4" style={config?.text_color ? { color: config.text_color } : {}}>
        <div className="max-w-3xl mx-auto">
          {/* セクションタイトル */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${!config?.text_color ? 'text-gray-900' : ''}`}>
              {t('❓ よくある質問', '❓ 常见问题')}
            </h2>
            <p className="text-gray-600">
              {t(
                'お客様からよくいただくご質問をまとめました',
                '汇总了客户常问的问题'
              )}
            </p>
          </div>

          {/* FAQアコーディオン */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mr-3">
                      Q{index + 1}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {language === 'zh' ? faq.question_zh : faq.question_ja}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 pt-2 bg-gradient-to-br from-indigo-50 to-blue-50">
                    <div className="flex items-start">
                      <span className="inline-block bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">
                        A
                      </span>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {language === 'zh' ? faq.answer_zh : faq.answer_ja}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
