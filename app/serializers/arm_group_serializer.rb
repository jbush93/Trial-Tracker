class ArmGroupSerializer < ActiveModel::Serializer
  attributes :id, :trial_id, :label, :group_type, :description, :intervention_name
end
