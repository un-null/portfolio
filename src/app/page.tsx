import ActionIcon from "@/components/icons/action-icon";
import StackIcon from "@/components/icons/stack-icon";
import { getAllWorks } from "@/utils/notion";

export default async function Home() {
  const { result } = await getAllWorks();

  return (
    <div>
      <div className="mt-5 w-full sm:max-w-screen-sm">
        <div className="mt-5 cursor-default overflow-auto">
          <table className="w-full tabular-nums">
            <thead className="border-b border-[#3A3A3A] text-left text-xs">
              <tr>
                <th className="whitespace-nowrap p-0 pb-2 text-left font-thin">
                  date
                </th>
                <th className="whitespace-nowrap p-0 pb-2 text-left font-thin">
                  title
                </th>
                <th className="whitespace-nowrap p-0 pb-2 text-left font-thin">
                  stack
                </th>
                <th className="whitespace-nowrap p-0 pb-2 text-center font-thin">
                  github
                </th>
              </tr>
            </thead>
            <tbody className="divide-y align-top">
              {result.map((item) => (
                <tr key={item?.id} className="border-[#3A3A3A] p-2 text-sm">
                  <td className="w-0 whitespace-nowrap p-0 pr-4 text-left align-middle tabular-nums">
                    {item?.date}
                  </td>
                  <td className="whitespace-nowrap p-0 pr-4 text-left align-middle tabular-nums text-[#EEEEEE]">
                    {item?.public_url ? (
                      <a
                        href={item.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.title.join("")}
                      </a>
                    ) : (
                      <p>{item?.title.join("")}</p>
                    )}
                  </td>
                  <td className="w-0 whitespace-nowrap p-0 text-left align-middle tabular-nums">
                    <ul className="flex space-x-2 text-[#EEEEEE]">
                      {item?.langs.map((lang) => (
                        <li key={lang.name}>
                          <span>
                            <StackIcon type={lang.name} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="w-0 whitespace-nowrap p-4 text-left align-middle tabular-nums">
                    <ActionIcon
                      href={item?.github_url ? item.github_url : ""}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
