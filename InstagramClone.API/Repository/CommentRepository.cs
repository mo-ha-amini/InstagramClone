using Dapper;
using Models;
using Models.DTO.Request;
using Repository;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class CommentRepository: ICommentRepository
    {
        private readonly IDatabaseConnection _databaseConnection;
        public CommentRepository(IDatabaseConnection databaseConnection)
        {
            _databaseConnection = databaseConnection;
        }

        public async Task<CustomActionResult> CreateComment(CreateCommentRequest model)
        {
            CustomActionResult result = new CustomActionResult();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = @"prc_create_comment";
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@UserId", model.UserId);
                parameters.Add("@PostId", model.PostId);
                parameters.Add("@CommentText", model.CommentText);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);
                result.IsSuccess = true;
                result.Message = "create Comment success";

            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "create Comment failed";
            }
            return result;
        }
    }
}
