defmodule Auction.Repo do
  use Ecto.Repo,
      otp_app: :auction,
      adapter: Ecto.Adapters.Postgres

  import Ecto.Query, only: [order_by: 3]

  alias Auction.Item

  def all_ordered_by_title() do
    Item
    |> order_by([], asc: :title)
    |> all()
  end
end
