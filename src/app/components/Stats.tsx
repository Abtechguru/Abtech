import { motion } from "motion/react";
import { Users, Code, Award, TrendingUp } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: Code,
      value: "50+",
      label: "Projects Delivered",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      value: "10K+",
      label: "Active Users",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      value: "3+",
      label: "Years Experience",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: "System Uptime",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
