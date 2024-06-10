using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class RepositoryPageResponse
    {
        public Repository Repository { get; set; }
        public bool canRemovePost { get; set; }
        public int numberOfUsers { get; set; }
        public int numberOfPosts { get; set; }
    }
}

