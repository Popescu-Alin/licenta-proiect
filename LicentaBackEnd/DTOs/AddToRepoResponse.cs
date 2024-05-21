using LicentaBackEnd.Models;

namespace LicentaBackEnd.DTOs
{
    public class AddToRepoResponse
    {
        public Repository Repository { get; set; }
        public string ImageURL { get; set; }
        public int numberOfUsers { get; set; }
        public int numberOfPosts { get; set; }

        public bool IsPostSavedInRepo { get; set;}
    }
}
