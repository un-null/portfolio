import ActionIcon from "@/components/icons/action-icon";
import StackIcon from "@/components/icons/stack-icon";
import InterviewCard from "@/components/interview-card";
import { getAllWorks } from "@/utils/notion";

export default async function Home() {
  const { result } = await getAllWorks();

  return (
    <div>
      <p className="mt-5 text-sm leading-loose">
        I&apos;m Keita Kawabata. I have about four years of experience, working
        on government and client projects in Kobe and Tokyo, Japan. I studied
        computer science in Indonesia for two years, and I am now studying
        business in Lithuania on a short exchange.
      </p>

      <h2 className="mt-8 text-sm font-bold">interview</h2>
      <InterviewCard />

      <h2 className="mt-8 text-sm font-bold">works</h2>
      <div className="mt-4 w-full sm:max-w-screen-sm">
        <div className="cursor-default overflow-auto">
          <table className="w-full tabular-nums">
            <thead className="border-b border-[#3A3A3A] text-left text-xs">
              <tr>
                <th className="hidden whitespace-nowrap p-0 pb-2 text-left font-thin sm:table-cell">
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
                <tr key={item.id} className="border-[#3A3A3A] p-2 text-sm">
                  <td className="hidden w-0 whitespace-nowrap p-0 pr-4 text-left align-middle tabular-nums sm:table-cell">
                    {item.date}
                  </td>
                  <td className="whitespace-nowrap p-0 pr-4 text-left align-middle tabular-nums text-[#EEEEEE]">
                    {item.domain || item.public_url ? (
                      <a
                        href={item.domain || item.public_url || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p>{item.title}</p>
                    )}
                    {item.archived ? (
                      <span className="ml-2 rounded border border-[#4A2A2A] bg-[#2A1A1A] px-1.5 py-0.5 text-[10px] text-[#E5726B]">
                        archived
                      </span>
                    ) : null}
                  </td>
                  <td className="w-0 whitespace-nowrap p-0 text-left align-middle tabular-nums">
                    <ul className="flex space-x-2 text-[#EEEEEE]">
                      {item.langs.map((lang) => (
                        <li key={lang.name}>
                          <span title={lang.name}>
                            <StackIcon type={lang.name} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="w-0 whitespace-nowrap p-4 text-left align-middle tabular-nums">
                    <ActionIcon href={item.github_url ? item.github_url : ""} />
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
