import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";
import { BarLoader } from "react-spinners";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const {
    isLoading: sellerDataLoading,
    data: sellerData,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      Promise.all(
        data.map(
          async (c) =>
            await newRequest
              .get(
                `conversations/getName/${
                  currentUser.isSeller ? c.buyerId : c.sellerId
                }`
              )
              .then((res) => ({
                sellerId: currentUser.isSeller ? c.buyerId : c.sellerId,
                sellerName: res.data,
              })) // Include sellerId
        )
      ),
    enabled: !!data, // Only fetch when data is available
  });

  const reload = () => {
    window.location.href = window.location.href;
  };

  return (
    <div className="messages">
      {isLoading ? (
        <div className="loader">
          <BarLoader
            color="#ff4533"
            loading={isLoading}
            width={150}
            height={10}
          />
        </div>
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>
                    {!currentUser.isSeller ? (
                      sellerDataLoading ? (
                        <div className="loader">
                          <BarLoader
                            color="#ff4533"
                            loading={isLoading}
                            width={150}
                            height={10}
                          />
                        </div>
                      ) : (
                        (() => {
                          if (sellerData) {
                            const seller = sellerData.find(
                              (e) => e && e.sellerId === c.sellerId
                            );
                            if (seller) {
                              return seller.sellerName;
                            } else {
                              return (
                                <div>
                                  Seller data not found.{" "}
                                  <button onClick={reload}>Reload</button>
                                </div>
                              );
                            }
                          } else {
                            return (
                              <div>
                                Seller data not found.{" "}
                                <button onClick={reload}>Reload</button>
                              </div>
                            );
                          }
                        })()
                      )
                    ) : (
                      (() => {
                        if (sellerData) {
                          const seller = sellerData.find(
                            (e) => e && e.sellerId === c.buyerId
                          );
                          if (seller) {
                            return seller.sellerName;
                          } else {
                            return (
                              <div>
                                Seller data not found.{" "}
                                <button onClick={reload}>Reload</button>
                              </div>
                            );
                          }
                        } else {
                          return (
                            <div>
                              Seller data not found.{" "}
                              <button onClick={reload}>Reload</button>
                            </div>
                          );
                        }
                      })()
                    )}
                  </td>

                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
