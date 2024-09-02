using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models.DTO.Request;
using Models.DTO.Response;

using Dapper;
using System.Data;
using Repository.Interface;
using Models.Entities;
using System.Reflection;
using Newtonsoft.Json;

namespace Repository
{
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

                string command = @"CreateUser";
                DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@Id", model.Id);
                parameters.Add("@Email", model.Email);
                parameters.Add("@Password", model.Password);
                parameters.Add("@Gender", model.Gender);
                parameters.Add("@Username", model.Username);
                parameters.Add("@Name", model.Name);
                parameters.Add("@Bio", model.Bio);
                parameters.Add("@PhoneNumber", model.PhoneNumber);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);
            


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

        public async Task<CustomActionResult<LoginResponse>> GetUserByUsernameAndPassword(LoginRequest model)
        {

            CustomActionResult<LoginResponse> result = new CustomActionResult<LoginResponse>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = "prc_find_user_by_username";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add(name: "@username", value: model.Username);
                //parameters.Add(name: "@password", value: model.Password);

                result.Data = await connection.Data.QueryFirstOrDefaultAsync<LoginResponse>(command, parameters, commandType: System.Data.CommandType.StoredProcedure);


                if (result.Data != null)
                {
                    bool verified = BCrypt.Net.BCrypt.Verify(model.Password, result.Data.Password);
                    if (verified)
                    {
                        result.IsSuccess = true;
                    }
                    else
                    {
                        result.Data = null;
                        result.IsSuccess = false;
                        result.Message = "Invalid Username Or Password";
                    }
                }
                else
                {
                    result.Data = null;
                    result.IsSuccess = false;
                    result.Message = "Invalid Username Or Password";
                }
            }
            catch (Exception)
            {
                result.Data = null;
                result.IsSuccess = false;
                result.Message = "Error Geting Userinfo.";
            }

            return result;
        }

        public async Task<CustomActionResult<GetProfileByUsernameResponse>> GetUserProfileByUsername(string username)
        {
            CustomActionResult<GetProfileByUsernameResponse> result = new CustomActionResult<GetProfileByUsernameResponse>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = @"prc_get_profile_by_username";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add(name: "@UserName", value: username);

                var profileData = await connection.Data.QueryAsync<dynamic>(command, parameters, commandType: CommandType.StoredProcedure);
                var user = profileData.FirstOrDefault();

                if (user == null)
                {
                    result.IsSuccess = false;
                    result.Message = "User not found.";
                    return result;
                }

                var posts = user.Posts != null ? JsonConvert.DeserializeObject<List<Post>>(user.Posts) : new List<Post>();

                result.Data = new GetProfileByUsernameResponse
                {
                    Id = user.Id,
                    Email = user.Email,
                    Gender = user.Gender,
                    Username = user.Username,
                    Name = user.Name,
                    Bio = user.Bio,
                    PhoneNumber = user.PhoneNumber,
                    FollowerCount = user.FollowerCount,
                    FollowingCount = user.FollowingCount,
                    Posts = posts
                };

                result.IsSuccess = true;
                result.Message = "Profile retrieved successfully.";
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"An error occurred: {ex.Message}";
            }

            return result;
        }

        public async Task<CustomActionResult> Follow(int userId, int followingId)
        {
            CustomActionResult result = new CustomActionResult();

            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;

                if (!result.IsSuccess) return result;

                string command = @"Prc_follow_user";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@FollowingId", followingId);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);

                result.IsSuccess = true;
                result.Message = "Follow Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed to follow User";
            }

            return result;
        }

        public async Task<CustomActionResult> UnFollow(int userId, int followingId)
        {
            CustomActionResult result = new CustomActionResult();

            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;

                if (!result.IsSuccess) return result;

                string command = @"prc_unfollow_user";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                parameters.Add("@FollowingId", followingId);

                await connection.Data.ExecuteAsync(command, parameters, commandType: CommandType.StoredProcedure);

                result.IsSuccess = true;
                result.Message = "UnFollow Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed to unfollow User";
            }

            return result;
        }

        public async Task<CustomActionResult<List<getfollowerResponse>>> getFollowingsById(int userId)
        {
            CustomActionResult<List<getfollowerResponse>> result = new CustomActionResult<List<getfollowerResponse>>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = @"prc_get_following";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);

                var data = await connection.Data.QueryAsync<getfollowerResponse>(command, parameters, commandType: CommandType.StoredProcedure);
                result.Data = data.ToList();
                result.IsSuccess = true;
                result.Message = "Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed";
            }

            return result;
        }

        public async Task<CustomActionResult<List<getfollowerResponse>>> getFollowersById(int userId)
        {

            CustomActionResult<List<getfollowerResponse>> result = new CustomActionResult<List<getfollowerResponse>>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = @"prc_get_followers";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);

                var data = await connection.Data.QueryAsync<getfollowerResponse>(command, parameters, commandType: CommandType.StoredProcedure);
                result.Data = data.ToList();
                result.IsSuccess = true;
                result.Message = " Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed";
            }

            return result;
        }

        public async Task<CustomActionResult<List<SearchUserRespone>>> SearchUser(string query)
        {
            CustomActionResult<List<SearchUserRespone>> result = new CustomActionResult<List<SearchUserRespone>>();
            try
            {
                CustomActionResult<IDbConnection> connection = await _databaseConnection.GetConnection();
                result.IsSuccess = connection.IsSuccess;
                result.Message = connection.Message;
                if (!result.IsSuccess) return result;

                string command = @"prc_search_users";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Query", query);

                var data = await connection.Data.QueryAsync<SearchUserRespone>(command, parameters, commandType: CommandType.StoredProcedure);
                result.Data = data.ToList();
                result.IsSuccess = true;
                result.Message = "Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result.IsSuccess = false;
                result.Message = "Failed";
            }

            return result;
        }
    }
}