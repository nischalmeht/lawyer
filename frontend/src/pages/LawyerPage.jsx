import React, { useState } from "react";

const LawyerPage = () => {
  const [search, setSearch] = useState("");

  const lawyers = [
    {
      name: "Sarah Chen",
      specialization: "Corporate Law",
      contact: "(555) 123-4567",
      status: "Online",
      lastLogin: "2 hours ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHFMGFOAl7fXGx82Wocy1s4nYEvAOMOS_-Z7sxDrwHrLQZyu-VKjoDLM2IBhiADl7uelYiltoOwi28Vqyigo23T_hIvP_qFAk9A7yeUbFbj1FARu4ud54xI-CS4XlWj_JVZ2UiDrf_D4wHypZXcv4NSDntnWBL_hUhzdSwb4j29g059uvk376CXrrGsLOsxyuB7eq27gVwckd0BVcLMdx4AdD7bqqyNPgOxb_C5-TA_IN-fr3td8OcsokoIFwRwyFsndSvlEHR",
    },
    {
      name: "David Rodriguez",
      specialization: "Family Law",
      contact: "(555) 987-6543",
      status: "Offline",
      lastLogin: "1 day ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmA2q5IS7U7SpNRU-cahuzsysBf-tSwE0JHE9xO1gbm_L8k0NuSdY8v4n1zb2HAbs8LE2vmPjCPlsWWVKvKE2qxZIh8ecXickC2aYF0vtaVeWyiGeEnjDKbcHpFB2YfPoGUINpm0FDCPkfnH2_02uz6rAKKhcU9DQj4BtxdNtqkSvv91jS6z-XLo2349Zy9JtWosMrgPwCm2nOIerMcsljDCHuWSACbIFUemYGbkRCFfwZ_ynqcBV9bye0a0zRhw4epoxhwmiv",
    },
    {
      name: "Emily Carter",
      specialization: "Criminal Defense",
      contact: "(555) 246-8013",
      status: "Online",
      lastLogin: "30 minutes ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDS8mvJqUtx5y99sZ0pmAwj4zFo6pwQOfEPgOea0WO6uEfbkOuVCCVxukAg3BwaSZrfdS4DEQrVvpS4NIlwbZjAFE_KBon3hsXEMWTFxl4emw-yQfUWxNu5OjzS0xrLRfZy3h4c4buebUfk-qHyst6esAkrTZIsokiIHKJHk6ijW3_gMdlcvPupZ5A15p6tpHrCMji_W6bpRI4XnOgXpWUaTrwntmqu2Ir4adfUUVg-aIr4zHe7M8PSLdZfQNpm4unwgl5t2Vd2",
    },
    {
      name: "Michael Johnson",
      specialization: "Real Estate Law",
      contact: "(555) 135-7924",
      status: "Offline",
      lastLogin: "2 days ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDxbbmSHy3QBRDA2duFtkebgXjklmqM9ArgtiZr_ihlcbaMx1xPiJJXRk21tiglizyyz_kYaZD6wnRvf1RzuLktnQ6HrJhudgpy1DZ47vUMIrCoACMhmm7haCpusc7Lvr3ztgpv5TQta7_1i39P9daIhlmegOQhYpMnOLaAjXNc4RlG4gc-UKF-rNefMWDF6_xDJw96iuL4l-bubhlGPp0s6xINA4VUifBtP0Wtw-Jaj_L7ygFCR9xGOV9qQSyQlJ0HwlIW8VH8",
    },
    {
      name: "Jessica Lee",
      specialization: "Intellectual Property",
      contact: "(555) 369-1470",
      status: "Online",
      lastLogin: "1 hour ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpVvZmaEyRpQhpvnZtPrR325IFOFCP8fkCDBSUi4MnTK8sY2M4IvSDzmgfgGFGUMUTlleZ1_Puf1pA7-4HISZA9luIVnO696gsGX69BW1idNb-crjApdtMOceXK2yA6CN7nvkOVqXtlJZn2APB-CeYgFMO0AI_CmuqbtyK50ot_NmFh5lJTt3P4s0D4Qcb2pXLPaTzN8-BwkF4dabv5-sSHN1tuHq3H4VbrsCKJchHZrNdfw5YjgJ3cwXccaF_rYpRrIQkMsU-",
    },
  ];

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#111418] text-[32px] font-bold leading-tight">
              Lawyer Directory
            </p>
            <p className="text-[#60758a] text-sm">
              Find the right legal expert for your needs.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full items-stretch rounded-lg h-full bg-[#f0f2f5]">
              <div className="text-[#60758a] flex items-center justify-center pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or specialization"
                className="form-input flex w-full px-4 text-base bg-[#f0f2f5] border-none focus:outline-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Lawyers List */}
        {filteredLawyers.map((lawyer, idx) => (
          <div key={idx} className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1 flex-[2_2_0px]">
                <p className="text-[#111418] text-base font-bold leading-tight">
                  {lawyer.name}
                </p>
                <p className="text-[#60758a] text-sm">
                  Specialization: {lawyer.specialization} | Contact:{" "}
                  {lawyer.contact} | Status: {lawyer.status} | Last Login:{" "}
                  {lawyer.lastLogin}
                </p>
              </div>
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                style={{ backgroundImage: `url(${lawyer.image})` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerPage;
