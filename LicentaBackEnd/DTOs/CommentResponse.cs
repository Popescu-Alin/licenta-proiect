using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class CommentResponse
    {
        public Comment Comment { get; set; }
        public BasicUserInfo UserInfo { get; set; }

    }
}
