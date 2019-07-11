class UsersController < ApplicationController
    # skip_before_action :verify_authenticity_token


    def index
        users = User.all
        render json: users
    end 

    def user_feelings
        user = User.find(params[:id])
        render json: user.feelings
    end

    def new
        user = User.new
    end

    def create
        # byebug
        user = User.find_by(name: params[:name])
        if !user
            user = User.new(user_params)
            user.save
        end
        render json: user
    end

    def user_params
        params.require(:user).permit(:name, :currentMood)
    end

end
