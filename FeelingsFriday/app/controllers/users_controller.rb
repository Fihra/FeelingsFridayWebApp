class UsersController < ApplicationController
    # skip_before_action :verify_authenticity_token


    def index
        users = User.all
        render json: users
    end 

    def new
        user = User.new
    end

    def create
        # byebug
        user = User.new(user_params)
        user.save
        render json: user
    end

    def user_params
        params.require(:user).permit(:name, :currentMood)
    end

end
