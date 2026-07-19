export type PlaceholderPost = {
  slug: string;
  titleVi: string;
  titleEn: string;
  excerptVi: string;
  excerptEn: string;
  bodyVi: string;
  bodyEn: string;
  coverImage: string;
};

export const posts: PlaceholderPost[] = [
  {
    slug: "chuyen-vai-organic",
    coverImage: "/images/journal/chuyen-vai-organic.jpg",
    titleVi: "Vì sao chúng tôi chỉ dùng cotton organic",
    titleEn: "Why we only work with organic cotton",
    excerptVi: "Một chuyến thăm xưởng dệt đối tác — và lý do chất liệu quyết định tất cả.",
    excerptEn: "A visit to our partner mill — and why fabric decides everything.",
    bodyVi:
      "Cotton organic không chỉ tốt cho làn da mà còn giảm đáng kể lượng nước và hóa chất dùng trong canh tác. Chúng tôi làm việc trực tiếp với các xưởng dệt tại Việt Nam để đảm bảo từng mét vải đạt chuẩn trước khi cắt may.",
    bodyEn:
      "Organic cotton isn't just gentler on skin — it dramatically reduces the water and chemicals used in farming. We work directly with mills in Vietnam to make sure every meter of fabric meets standard before it's ever cut.",
  },
  {
    slug: "gia-minh-bach",
    coverImage: "/images/journal/gia-minh-bach.jpg",
    titleVi: "Bên trong một mức giá minh bạch",
    titleEn: "Inside an honest price tag",
    excerptVi: "Điều gì thực sự tạo nên giá thành một chiếc áo — và phần nào là markup.",
    excerptEn: "What actually makes up the cost of a shirt — and what's just markup.",
    bodyVi:
      "Phần lớn giá bán lẻ thời trang truyền thống đến từ các lớp trung gian, không phải chất liệu hay tay nghề. Bằng cách làm việc trực tiếp với xưởng sản xuất, chúng tôi giữ giá thành gắn liền với chất lượng thật.",
    bodyEn:
      "Most of a traditional retail price comes from layers of middlemen, not fabric or craft. By working directly with our ateliers, we keep the price tied to real quality instead.",
  },
  {
    slug: "tay-nghe-may-do",
    coverImage: "/images/journal/tay-nghe-may-do.jpg",
    titleVi: "Bên trong xưởng may đo của chúng tôi",
    titleEn: "Inside our tailoring atelier",
    excerptVi: "Gặp gỡ những người thợ đứng sau từng đường kim mũi chỉ của Maison DnA.",
    excerptEn: "Meet the hands behind every stitch at Maison DnA.",
    bodyVi:
      "Mỗi sản phẩm đều trải qua kiểm định hai lớp trước khi rời xưởng — từ đường may, form dáng đến độ bền chất liệu. Đó là cách chúng tôi giữ lời hứa về một sản phẩm bền lâu.",
    bodyEn:
      "Every piece goes through a two-step quality check before it leaves the atelier — seams, fit, and fabric durability. It's how we keep our promise of something built to last.",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
