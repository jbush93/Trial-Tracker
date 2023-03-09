class LocationSerializer < ActiveModel::Serializer
  attributes :id, :trial_id, :facility, :city, :state, :zip, :country
end
