
namespace Data.DTOs
{
    public class PartDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public PartConditionEnum Condition { get; set; }
        public string ConditionName { get; set; }
        public string ImageUrl { get; set; }
        public int SellerId { get; set; }
        public int CategoryId { get; set; } // Added
        public int? CarModelId { get; set; } 
        public string? CarModelName { get; set; } 
    }
}
