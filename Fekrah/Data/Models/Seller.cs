public class Seller
{
    public int Id { get; set; }
    public string ShopName { get; set; }
    public string PhoneNumber { get; set; }
    public string PasswordHash { get; set; }

    public ICollection<Part> Parts { get; set; }
}

