using Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Seller
{
    public int Id { get; set; }
    public string ShopName { get; set; }
    public string ImageUrl { get; set; }
    public string PhoneNumber { get; set; }
    public string PasswordHash { get; set; }
    public string Location { get; set; }


    public ICollection<Part> Parts { get; set; }
    public ICollection<SellerCategory> SellerCategories { get; set; }
}

