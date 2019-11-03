import React, { Component } from "react";
import CM from "./index.module.less";
class CinemaDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  thisnavTo = (e) =>{
    let cinemsID = e.target.dataset.id
    this.props.navCinemaInfo(cinemsID);
  }
  render() {
    return (
      <div className={CM.movie_info}>
        <ul
          onClick={e => {
            this.thisnavTo(e);
          }}
        >
          {this.props.cinemas.map(cinema => {
            return (
              <li key={cinema.id} data-id={cinema.id}>
                <div className={CM.movie_title} data-id={cinema.id}>
                  <p className={CM.nnm + " pointer"}>{cinema.nm}</p>
                  <div className={CM.price}>{cinema.sellPrice}</div>
                  <span>元起</span>
                </div>
                <div className={CM.movie_address} data-id={cinema.id}>
                  <p className="pointer">{cinema.addr}</p>
                  <span>{cinema.distance}</span>
                </div>
                <div className={CM.afterSale} data-id={cinema.id}>
                  <div
                    className={
                      cinema.tag && cinema.tag.allowRefund
                        ? CM.allowRefund
                        : CM.none
                    }
                  >
                    退
                  </div>

                  <div className={CM.allowRefund}>改签</div>
                  {cinema.tag &&
                    cinema.tag.hallTypeVOList &&
                    cinema.tag.hallTypeVOList.map(item => {
                      return (
                        <div className={CM.allowRefund} key={item.name}>
                          {item.name}
                        </div>
                      );
                    })}

                  <div className={CM.vipTag}>折扣卡</div>
                  <div
                    className={
                      cinema.tag && cinema.tag.snack ? CM.allowRefund : CM.none
                    }
                  >
                    小吃
                  </div>
                </div>

                <div
                  className={
                    cinema.promotion && cinema.promotion.cardPromotionTag
                      ? CM.discounts
                      : CM.none
                  }
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
                    alt=""
                  />
                  <span>
                    {cinema.promotion && cinema.promotion.cardPromotionTag}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CinemaDetail;
