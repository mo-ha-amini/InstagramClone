using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models.DTO.Request;
using Dapper;
using System.Data;
using System.Reflection;
using System.Xml.Linq;
using Azure.Core;

namespace Repository
{
    public interface IUserRepository
    {
        Task<CustomActionResult> CreateUser(CreateUserRequest model);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDatabaseConnection _databaseConnection;

        public UserRepository(IDatabaseConnection databaseConnection)
        {
            _databaseConnection = databaseConnection;
        }

        public async Task<CustomActionResult> CreateUser(CreateUserRequest model)
        {
            CustomActionResult result = new CustomActionResult();

            try
            {
                CustomActionResult<System.Data.IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;

                if(!result.IsSuccess) return result;

                string command = @"pkg_user.create_user";
                DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@Id", model.Id);
                parameters.Add("@Email", model.Email);
                parameters.Add("@Password", model.Password);
                parameters.Add("@Gender", model.Gender);
                parameters.Add("@Username", model.Username);
                parameters.Add("@Name", model.Name);
                parameters.Add("@Bio", model.Bio);
                parameters.Add("@PhoneNumber", model.PhoneNumber);

                await connection.Data.ExecuteAsync("CreateUser", parameters, commandType: CommandType.StoredProcedure);
            


                result.IsSuccess = true;
                result.Message = result.Message;
                
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "create user failed";
            }
            return result;
        }
    }
}
