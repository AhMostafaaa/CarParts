public class PartViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Condition { get; set; }
    public string ImageUrl { get; set; }
    public string SellerShopName { get; set; }
    public bool IsSold { get; set; }

    public string CategoryName { get; set; } // Added
}
