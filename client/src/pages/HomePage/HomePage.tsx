import {
  SendCoin,
  getMeApi,
  getWallet,
  mineCoinApi,
  sendCoinApi,
} from "@/apis/home";
import { getTransactions } from "@/apis/transaction";
import { logoutApi } from "@/apis/wallet";
import { classNames } from "@/utils/classNames";
import {
  Avatar,
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Logout, Send2 } from "iconsax-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";

const HomePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [toAddress, setToAddress] = useState("");
  const [sendCoin, setSendCoin] = useState(0);
  const address = useDebounce(toAddress, 200);

  const [searchAddress, setSearchAddress] = useState("");
  const search = useDebounce(searchAddress, 200);

  const { data, refetch } = useQuery({
    queryKey: ["getMeApi"],
    queryFn: () => getMeApi(),
  });

  const { data: toWallet, isLoading } = useQuery({
    queryKey: [getWallet, address],
    queryFn: () => getWallet(address),
    enabled: !!address,
  });

  const { data: transactions, refetch: transactionsRefetch } = useQuery({
    queryKey: ["getTransactions", search],
    queryFn: () => getTransactions(search),
  });

  const { mutate, isLoading: sendLoading } = useMutation({
    mutationFn: (data: unknown) => sendCoinApi(data as SendCoin),
    onSuccess: () => {
      toast({
        description: "Send coin successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      transactionsRefetch().catch(() => null);
      refetch().catch(() => null);
    },
    onError: () =>
      toast({
        title: "Something wrong",
        description: "Send coin failure. Out of balance!",
        status: "error",
        duration: 2000,
        isClosable: true,
      }),
  });

  const { mutate: mineCoin, isLoading: mineLoading } = useMutation({
    mutationFn: () => mineCoinApi(),
    onSuccess: () => {
      toast({
        description: "Mine coin successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      transactionsRefetch().catch(() => null);
      refetch().catch(() => null);
    },
    onError: () =>
      toast({
        title: "Something wrong",
        description: "Mine coin failure.",
        status: "error",
        duration: 2000,
        isClosable: true,
      }),
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => navigate("/"),
  });

  if (!data) {
    return (
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    );
  }

  const onSend = () => {
    mutate({ from: data.publicKey, to: address, amount: sendCoin });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white shadow-lg flex items-center px-6 h-[80px] gap-6">
        <div className="flex items-center gap-2">
          <Avatar name={data.name} />
          <div className="flex flex-col font-medium">
            <div className="text-base font-bold">{data.name}</div>
            <div className="truncate text-xs">Public key: {data.publicKey}</div>
            <div className="truncate text-xs text-gray-500">
              Private key: {data.privateKey}
            </div>
          </div>
        </div>
        <div className="text-xl font-bold text-sky-700 ml-auto">MyCoin</div>
        <Button
          onClick={() => logout()}
          colorScheme="blue"
          variant="outline"
          rightIcon={<Logout size="32" color="#0369a1" variant="Bulk" />}
        >
          Log out
        </Button>
      </div>
      <div className="flex p-6 gap-8">
        <div className="w-2/3">
          <div className="flex justify-between">
            <div className="text-4xl font-semibold mb-10 whitespace-nowrap">
              {data.balance.toFixed(2)} coin
            </div>
            <Input
              maxWidth={300}
              textOverflow="ellipsis"
              placeholder="Address"
              value={search}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
          </div>
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Form</Th>
                  <Th>To</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((txs) => (
                  <Tr key={txs._id}>
                    <Td>{txs.from}</Td>
                    <Td>{txs.to}</Td>
                    <Td isNumeric>{txs.amount.toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <div className="w-1/3">
          <div className=" p-3 bg-sky-600 rounded-3xl shadow-xl">
            <div className="p-4 rounded-2xl bg-white shadow-lg flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Send2 size="40" color="#0369a1" variant="Bulk" />
                <div className="text-sky-700 font-bold text-2xl mb-1">
                  Send Coin
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-xl">
                <Avatar width={10} height={10} name={data.name} />
                <div className="w-full">
                  <div className="font-medium">From:</div>
                  <Input
                    disabled
                    placeholder="From"
                    variant="unstyled"
                    value={data.publicKey}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-xl">
                <Avatar width={10} height={10} name={toWallet?.name} />
                <div className="w-full">
                  <div className="font-medium">
                    {toWallet ? `To ${toWallet.name} :` : "To :"}
                  </div>
                  <Input
                    disabled={isLoading && !!address}
                    placeholder="To Address"
                    variant="unstyled"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-xl">
                <Input
                  type="number"
                  placeholder="0"
                  fontSize="3xl"
                  variant="unstyled"
                  value={sendCoin}
                  onChange={(e) => setSendCoin(+e.target.value)}
                />
                <div className="bg-slate-200 font-medium px-2 py-1 rounded">
                  coin
                </div>
              </div>
              <Button
                isLoading={sendLoading}
                onClick={onSend}
                size="lg"
                className={classNames("w-full mt-1", {
                  "pointer-events-none": sendCoin <= 0 || !toWallet,
                })}
                colorScheme={sendCoin <= 0 || !toWallet ? "gray" : "blue"}
              >
                Send
              </Button>
            </div>
          </div>
          <Button
            isLoading={mineLoading}
            onClick={() => mineCoin()}
            size="lg"
            className="w-full mt-4"
            colorScheme="facebook"
          >
            Mine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
