import React from 'react';
import { TrendingUp, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useBlogPosts } from '../hooks/useBlogPosts';

interface ResultsProps {
  config?: {
    background_color?: string;
    text_color?: string;
  };
}

export const Results: React.FC<ResultsProps> = ({ config }) => {
  const { language, t } = useLanguage();
  const { data: posts, loading } = useBlogPosts(); // 制限なしで全て取得

  if (loading) {
    return (
      <section id="result" className="py-20" style={config?.background_color ? { backgroundColor: config.background_color } : {}}>
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
    <section id="result" className={`py-20 ${!config?.background_color ? 'bg-white' : ''}`} style={sectionStyle}>
      <div className="container mx-auto px-4" style={config?.text_color ? { color: config.text_color } : {}}>
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${!config?.text_color ? 'text-gray-900' : ''}`}>
            {t('📊 導入効果・事例', '📊 导入效果・案例')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              '定期メンテナンスにより年間発電量が最大15%向上！',
              '通过定期维护，年发电量最多提高15%！'
            )}
          </p>
        </div>

        {/* 効果のハイライト */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 md:p-12 rounded-2xl shadow-lg mb-12">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            {t('定期メンテナンスで発電効率を最大化', '通过定期维护最大化发电效率')}
          </h3>
          <p className="text-center text-gray-700 text-lg">
            {t(
              'パネル洗浄により平均10〜15%の発電効率向上を実現',
              '通过面板清洗实现平均10〜15%的发电效率提高'
            )}
          </p>
        </div>

        {/* 施工事例 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t('📸 施工・点検事例', '📸 施工・检查案例')}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
              >
                {post.image_url && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={language === 'zh' ? post.title_zh || '' : post.title_ja}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(post.publish_date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'ja-JP')}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {language === 'zh' ? post.title_zh : post.title_ja}
                  </h4>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {language === 'zh' ? post.content_zh : post.content_ja}
                  </p>

                  <div className="flex items-center text-primary font-medium text-sm">
                    <span>{t('詳しく見る', '查看详情')}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* お客様の声 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t('💬 お客様の声', '💬 客户评价')}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">
                  {t('兵庫県・法人様', '兵库县・企业客户')}
                </span>
              </div>
              <p className="text-gray-700 italic">
                「{t(
                  '定期点検をお願いしてから、発電量が安定しました！',
                  '委托定期检查后，发电量稳定了！'
                )}」
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-900">
                  {t('奈良県・オーナー様', '奈良县・业主')}
                </span>
              </div>
              <p className="text-gray-700 italic">
                「{t(
                  '施工後のサポートが丁寧で安心できます。',
                  '施工后的支持很细心，令人放心。'
                )}」
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
