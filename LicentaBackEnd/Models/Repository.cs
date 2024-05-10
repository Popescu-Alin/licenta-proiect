using System.ComponentModel.DataAnnotations;

namespace LicentaBackEnd.Models
{
    public class Repository
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid OwnerId { get; set; }
        public string AccessModifier { get; set; }
    }
}
