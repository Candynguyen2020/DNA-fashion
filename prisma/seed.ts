import { PrismaClient } from "../app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.staff.upsert({
    where: { email: "admin@maisondna.com" },
    update: {},
    create: {
      email: "admin@maisondna.com",
      passwordHash: await bcrypt.hash("changeme123", 10),
      fullName: "Maison DnA Admin",
      role: "admin",
    },
  });

  const [silver, gold, platinum] = await Promise.all([
    prisma.vipTier.upsert({
      where: { id: "vip-silver" },
      update: {},
      create: {
        id: "vip-silver",
        nameVi: "Bạc",
        nameEn: "Silver",
        minSpend: 0,
        perksVi: "Ưu đãi sinh nhật, giao hàng miễn phí.",
        perksEn: "Birthday gift, free shipping.",
        sortOrder: 1,
      },
    }),
    prisma.vipTier.upsert({
      where: { id: "vip-gold" },
      update: {},
      create: {
        id: "vip-gold",
        nameVi: "Vàng",
        nameEn: "Gold",
        minSpend: 50_000_000,
        perksVi: "Tư vấn phong cách riêng, ưu tiên đặt lịch hẹn.",
        perksEn: "Personal styling session, priority booking.",
        sortOrder: 2,
      },
    }),
    prisma.vipTier.upsert({
      where: { id: "vip-platinum" },
      update: {},
      create: {
        id: "vip-platinum",
        nameVi: "Bạch Kim",
        nameEn: "Platinum",
        minSpend: 150_000_000,
        perksVi: "Truy cập sớm bộ sưu tập giới hạn, quà tặng độc quyền.",
        perksEn: "Early access to limited collections, exclusive gifts.",
        sortOrder: 3,
      },
    }),
  ]);

  const collection = await prisma.collection.upsert({
    where: { slug: "signature-collection" },
    update: {},
    create: {
      slug: "signature-collection",
      nameVi: "Bộ Sưu Tập Đặc Trưng",
      nameEn: "Signature Collection",
      descVi: "Những thiết kế tiêu biểu định hình phong cách Maison DnA.",
      descEn: "The pieces that define the Maison DnA silhouette.",
    },
  });

  await prisma.product.upsert({
    where: { slug: "tailored-wool-blazer" },
    update: {},
    create: {
      slug: "tailored-wool-blazer",
      nameVi: "Áo Blazer Len May Đo",
      nameEn: "Tailored Wool Blazer",
      descriptionVi: "Blazer len cao cấp, may đo tinh xảo, form dáng thanh lịch.",
      descriptionEn: "Premium wool blazer with precise tailoring and an elegant silhouette.",
      basePrice: 8_900_000,
      status: "published",
      gender: "men",
      material: "100% Wool",
      collectionId: collection.id,
      variants: {
        create: [
          { sku: "TWB-BLK-48", size: "48", color: "Black", stockQty: 5 },
          { sku: "TWB-BLK-50", size: "50", color: "Black", stockQty: 5 },
        ],
      },
    },
  });

  console.log({ admin: admin.email, tiers: [silver.nameEn, gold.nameEn, platinum.nameEn] });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
