-- ================================================
-- 東勝会社 CMSウェブサイト - ページセクション背景グラデーション追加
-- ================================================
-- このマイグレーションファイルは:
-- 1. page_sectionsテーブルに background_gradient カラムを追加
-- を含みます。
--
-- 表示の優先順位:
-- 1. background_gradient があればそれを最優先で適用
-- 2. それがなければ background_color（単色）
-- 3. どちらもなければデフォルトグラデーション
-- ================================================

-- ------------------------------------------------
-- 1. background_gradient カラムを追加
-- ------------------------------------------------

ALTER TABLE page_sections 
ADD COLUMN IF NOT EXISTS background_gradient text;

COMMENT ON COLUMN page_sections.background_gradient IS 'CSS グラデーション指定（例: linear-gradient(to right, #667eea 0%, #764ba2 100%)）';

-- ------------------------------------------------
-- 2. 完了メッセージ
-- ------------------------------------------------

DO $$
BEGIN
  RAISE NOTICE '✅ background_gradient カラムの追加が完了しました！';
  RAISE NOTICE '📋 page_sections テーブルに background_gradient を追加';
  RAISE NOTICE '';
  RAISE NOTICE '優先順位:';
  RAISE NOTICE '  1. background_gradient (最優先)';
  RAISE NOTICE '  2. background_color (次点)';
  RAISE NOTICE '  3. デフォルトグラデーション (どちらもなし)';
END $$;
