using System.ComponentModel.DataAnnotations;

namespace MapMarkers.Models
{
    public class Marker
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public bool IncludeDate { get; set; }
    }
}
