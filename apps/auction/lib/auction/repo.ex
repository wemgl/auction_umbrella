defmodule Auction.Repo do
  use Ecto.Repo,
    otp_app: :auction,
    adapter: Ecto.Adapters.Postgres

  import Ecto.Query, only: [order_by: 3]

  def all_ordered_by_title(type) do
    order_by(type, [], asc: :title)
    |> all()
  end
end
