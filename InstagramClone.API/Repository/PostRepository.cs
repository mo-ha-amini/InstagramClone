using Models.DTO.Request;
using Models;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;

namespace Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly IDatabaseConnection _databaseConnection;
        public PostRepository(IDatabaseConnection databaseConnection)
        {
            _databaseConnection = databaseConnection;
        }
        public async Task<CustomActionResult> CreatePost(CreatePostRequest model)
        {
            CustomActionResult result = new CustomActionResult();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                byte[] mediaData;
                using (var memoryStream = new MemoryStream())
                {
                    await model.MediaFile.CopyToAsync(memoryStream);
                    mediaData = memoryStream.ToArray();
                }

                string command = @"prc_create_post";
                DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@Id", model.Id);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@Caption", model.Caption);
                parameters.Add("@Media", mediaData);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);
                result.IsSuccess = true;
                result.Message = result.Message;

            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "create Post failed";
            }
            return result;
        }
    }
}
