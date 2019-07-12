class UsersController < ApplicationController
    # skip_before_action :verify_authenticity_token


    def index
        users = User.all
        render json: users
    end 

    #display feelings api
    def user_feelings
        user = User.find(params[:id])
        render json: user.feelings
    end

    def new
        user = User.new
    end

    def create
        # byebug
        user = User.find_by(name: params[:name].capitalize)
        if !user
            #byebug
            user = User.new(user_params)
            user.save
        end
        #byebug
        if user.currentMood != params[:currentMood]
            user.update(currentMood: params[:currentMood])
        end

        # userMood = user(currentMood: params[:currentMood])
        # userMood.update
        render json: user
    end

    def update
        user = User.find_by(name: params[:name].capitalize)
        user.currentMood = params[:currentMood]
        #byebug
        user.update(user.currentMood)
        render json: user
    end

    private 

    def user_params
        params.require(:user).permit(:name, :currentMood)
    end

end
