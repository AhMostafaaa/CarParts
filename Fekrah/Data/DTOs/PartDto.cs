public class PartDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public PartConditionEnum Condition { get; set; }
    public string ImageUrl { get; set; }
    public int SellerId { get; set; }
    public int CategoryId { get; set; } // Added
}
