import { TailSpin } from 'react-loader-spinner'
interface LoadingProps {}

export default function Loading({}: LoadingProps) {
  return (
    <main className="mt-0 transition-all duration-200 ease-soft-in-out">
      <section className="">
        <div className="w-full h-screen relative flex flex-1 justify-center items-center p-0 overflow-hidden bg-center bg-cover min-h-85-screen">
          <div className="z-10">
            <div className="flex flex-wrap w-60 mt-0 -mx-3">
              <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                <div className=" h-full grid items-center justify-center">
                  <TailSpin color="#be185d" height={50} width={50} />
                  <div className="mt-6 font-normal text-gray-700">
                    Loading ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
