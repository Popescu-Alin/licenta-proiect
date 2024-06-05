using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class MainCommentResponse
    {
        public Comment Comment { get; set; }
        public BasicUserInfo UserInfo { get; set; }
        public int SubcommentsNumber { get; set; }
    }
}
