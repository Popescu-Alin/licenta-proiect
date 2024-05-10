namespace LicentaBackEnd.DTOs
{
    public class SlicedCollection<T> where T : class
    {
        public List<T> Collection = new();
        public int TotalCount { get; set; }
    }
}
