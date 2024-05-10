using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class CommentWithSubComments
    {
        public Comment Comment { get; set; }
        public IQueryable<Comment> SubComments { get; set; }
    }
}
