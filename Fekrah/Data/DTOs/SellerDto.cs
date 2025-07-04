
namespace Data.DTOs
{
    public class SellerDto
    {
        public int Id { get; set; }
        public string ShopName { get; set; }
        public string PhoneNumber { get; set; }
        public string ImageUrl { get; set; }
        public string Location { get; set; }
        public double Rating { get; set; }
        public bool IsActive { get; set; }
        public ICollection<SellerCategoryDto> SellerCategories { get; set; }
    }
}
