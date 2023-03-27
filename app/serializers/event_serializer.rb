class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :location, :description
end
