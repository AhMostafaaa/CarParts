public class Part
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public PartConditionEnum Condition { get; set; }
    public string ImageUrl { get; set; }
    public bool IsSold { get; set; }

    public int SellerId { get; set; }
    public Seller Seller { get; set; }

    // Add Category relation
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
