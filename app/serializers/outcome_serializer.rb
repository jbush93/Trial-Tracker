class OutcomeSerializer < ActiveModel::Serializer
  attributes :id, :trial_id, :outcome_type, :outcome_measure, :outcome_description, :outcome_timeframe
end
