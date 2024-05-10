using System.ComponentModel.DataAnnotations;

namespace LicentaBackEnd.Models
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }  
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public Guid PostId { get; set; }
        public Guid UserId { get; set; }
        public Guid? ParentCommetId { get; set; }
    }
}
