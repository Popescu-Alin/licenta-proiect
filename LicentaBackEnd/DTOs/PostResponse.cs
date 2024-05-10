using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class PostResponse
    {
        public Post Post { get; set; }
        public BasicUserInfo UserInfo { get; set; }
        public int NumberOfComments { get; set; }
        public int NumberOfLikes { get; set; }
    }
}
