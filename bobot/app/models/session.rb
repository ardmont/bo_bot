class Session < ApplicationRecord
     serialize :context, Hash
end
