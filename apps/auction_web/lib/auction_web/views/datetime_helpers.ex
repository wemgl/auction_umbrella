defmodule AuctionWeb.DatetimeHelpers do
  use Timex

  def integer_to_currency(cents) do
    dollars_and_cents =
      cents
      |> Decimal.div(100)
      |> Decimal.round(2)

    "$#{dollars_and_cents}"
  end

  def formatted_datetime(datetime) do
    datetime
    |> Timex.local()
    |> Timex.format!("{M}/{D}/{YYYY} {h12}:{m}{am}")
  end
end
