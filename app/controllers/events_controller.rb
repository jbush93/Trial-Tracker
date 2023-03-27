class EventsController < ApplicationController

  def index
    events = Event.all 
    render json: events, status: :ok
  end

  def create 
    event = Event.create!(events_params)
    render json: event, status: :created
  end

private
def events_params 
    params.permit(:title, :start, :end, :location, :description)
end
end
