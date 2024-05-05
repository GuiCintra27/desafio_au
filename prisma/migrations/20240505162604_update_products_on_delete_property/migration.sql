-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_category_id_fkey";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
