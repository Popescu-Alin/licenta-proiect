using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class RepositoryResponse
    {
        public Repository Repository { get; set; }
        public string ImageURL { get; set; }
        public int numberOfUsers { get; set; }
        public int numberOfPosts { get; set; }
    }
}
