using System.ComponentModel.DataAnnotations;

namespace LicentaBackEnd.Models
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid UserId { get; set; }
        public string Url { get; set; } 
    }
}
